# MongoDB Setup Guide

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (choose the free tier)

## 2. Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Select "Read and write to any database"
5. Click "Add User"

## 3. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add specific IPs)
4. Click "Confirm"

## 4. Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## 5. Environment Variables

Create a `.env` file in the backend directory with:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- `cluster.mongodb.net` with your actual cluster URL
- `database_name` with your desired database name

## 6. Render.com Configuration

In your Render.com backend service, add these environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: production
- `JWT_SECRET`: Your JWT secret

## 7. Install Dependencies

```bash
npm install
```

## 8. Test Connection

Start your server and check the console for "MongoDB Connected" message. 