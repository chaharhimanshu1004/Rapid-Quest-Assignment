const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const calculateGrowthRates = (salesData) => {
    const growthRates = [];
    for (let i = 1; i < salesData.length; i++) {
        const current = salesData[i].totalSales;
        const previous = salesData[i - 1].totalSales;
        const growthRate = ((current - previous) / previous) * 100;
        growthRates.push({
            period: salesData[i]._id,
            growthRate
        });
    }
    return growthRates;
};

router.get('/sales-growth-rate', async (req, res) => {
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

        const sales = await db.collection('shopifyOrders').aggregate([
            {
                $project: {
                    created_at: {
                        $dateFromString: { dateString: "$created_at" }
                    },
                    total_price: { $toDouble: "$total_price_set.shop_money.amount" }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: "$total_price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();

        const growthRates = calculateGrowthRates(sales);
        res.json(growthRates);
    } catch (error) {
        console.error('Error fetching sales growth rate:', error);
        res.status(500).json({ message: 'Error fetching sales growth rate', error });
    }
});


router.get('/total-sales', async (req, res) => {
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

        const sales = await db.collection('shopifyOrders').aggregate([
            {
                $project: {
                    created_at: {
                        $dateFromString: { dateString: "$created_at" }
                    },
                    total_price: { $toDouble: "$total_price_set.shop_money.amount" }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: "$total_price" }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]).toArray();
        res.json(sales);
    } catch (error) {
        console.error('Error fetching total sales:', error);
        res.status(500).json({ message: 'Error fetching total sales', error });
    }
});



module.exports = router;
