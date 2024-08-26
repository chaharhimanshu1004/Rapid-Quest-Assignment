const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const salesRoutes = require('./routes/orders');
const customersRoutes = require('./routes/customers');

require('dotenv').config();

const app = express();

app.use(cors(
    {
        origin:["http://localhost:3000"],
        credentials:true,
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json());


app.use('/api/sales', salesRoutes);
app.use('/api/customers', customersRoutes);

mongoose.connect(process.env.MONGODB_URI, {
     dbName: 'RQ_Analytics',
})
.then(() => {
    console.log('Connected to MongoDB');
}
).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
}
);

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);
