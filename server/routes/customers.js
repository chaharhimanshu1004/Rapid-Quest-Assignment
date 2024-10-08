const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/new-customers-track', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(500).json({ message: 'Database instance not available' });
        }
        const { interval } = req.query;
        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
                break;
            case 'quarterly':
                groupBy = {
                    $concat: [
                        { $substr: [{ $year: "$created_at" }, 0, 4] },
                        "-Q",
                        { $toString: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } } }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: "$created_at" } };
                break;
            default:
                return res.status(400).json({ message: 'Invalid interval parameter' });
        }
        const newCustomers = await db.collection('shopifyCustomers').aggregate([
            {
                $project: {
                    created_at: {
                        $dateFromString: { dateString: "$created_at" }
                    }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    newCustomersCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();

        res.json(newCustomers);
    } catch (error) {
        console.error('Error fetching new customers over time:', error);
        res.status(500).json({ message: 'Error fetching new customers over time', error });
    }
});

router.get('/repeat-customers', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(500).json({ message: 'Database instance not available' });
        }

        const { interval } = req.query;
        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
                break;
                case 'quarterly':
                    groupBy = {
                        $concat: [
                            { $toString: { $year: "$created_at" } },
                            "-Q",
                            { $toString: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } } }
                        ]
                    };
                    break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: "$created_at" } };
                break;
            default:
                return res.status(400).json({ message: 'Invalid interval parameter' });
        }

        const repeatCustomers = await db.collection('shopifyOrders').aggregate([
            {
                $addFields: {
                    created_at: {
                        $convert: {
                            input: "$created_at",
                            to: "date",
                            onError: new Date()  // Default to current date if conversion fails
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        interval: groupBy,
                        customer: "$customer_id"
                    },
                    purchaseCount: { $sum: 1 }
                }
            },
            {
                $match: {
                    purchaseCount: { $gt: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.interval",
                    repeatCustomersCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();

        res.json(repeatCustomers);
    } catch (error) {
        console.error('Error fetching repeat customers:', error);
        res.status(500).json({ message: 'Error fetching repeat customers', error });
    }
});

router.get('/customers-distribution', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(500).json({ message: 'Database instance not available' });
        }

        // Aggregate customer data by city
        const customerDistribution = await db.collection('shopifyCustomers').aggregate([
            {
                $group: {
                    _id: "$default_address.city",  
                    count: { $sum: 1 } 
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        res.json(customerDistribution);
    } catch (error) {
        console.error('Error fetching geographical distribution:', error);
        res.status(500).json({ message: 'Error fetching geographical distribution', error });
    }
});

router.get('/customer-lifetime-value', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(500).json({ message: 'Database instance not available' });
        }

        const lifetimeValueByCohort = await db.collection('shopifyOrders').aggregate([
            {
                $addFields: {
                    created_at: {
                        $dateFromString: {
                            dateString: "$created_at",
                            onError: new Date()  // Default to current date if conversion fails
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        customerId: "$customer_id",
                        firstPurchaseMonth: { $dateToString: { format: "%Y-%m", date: "$created_at" } }
                    },
                    totalSpent: { $sum: { $toDouble: "$total_price" } },
                }
            },
            {
                $group: {
                    _id: "$_id.firstPurchaseMonth",
                    cohortValue: { $avg: "$totalSpent" },
                    customersCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();

        res.json(lifetimeValueByCohort);
    } catch (error) {
        console.error('Error fetching customer lifetime value:', error);
        res.status(500).json({ message: 'Error fetching customer lifetime value', error });
    }
});







module.exports = router;
