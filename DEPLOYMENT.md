# Wild Academy - Free Deployment Guide

This guide will help you deploy the Wild Academy application completely free using free hosting services.

## 🚀 Deployment Architecture (100% Free)

- **Frontend**: Vercel (Free React hosting)
- **Backend**: Render (Free Node.js hosting)
- **Database**: MongoDB Atlas (Free tier)
- **Domain**: Free subdomains (your-app.vercel.app, your-app.onrender.com)

## 📋 Prerequisites (All Free)

- GitHub account (Free)
- Vercel account (Free)
- Render account (Free)
- MongoDB Atlas account (Free tier)

**Total Cost: $0/month**

## 🎯 Step 1: Deploy Backend to Render

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up and create a new account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select the `wild_academy/backend` folder or root repository
6. Configure:
   - **Name**: wild-academy-backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Instance Type**: Free (or paid for better performance)

### 3. Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
PORT=3001
MONGO_URI=mongodb+srv://ahmedgohbashy517_db_user:ahmed234@cluster0.daxpkes.mongodb.net/wild_academy?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secure-jwt-secret-here
```

### 4. Deploy
Click "Deploy Web Service". Wait for deployment to complete.
Copy your free backend URL: `https://your-app-name.onrender.com`

## 🎨 Step 2: Deploy Frontend to Vercel

### 1. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up and create a new account
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2. Set Environment Variables
In Vercel dashboard, add:
```
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### 3. Deploy
Click "Deploy". Wait for deployment to complete.
Copy your free frontend URL: `https://your-project-name.vercel.app`

## � Step 3: Update API URLs for Free Subdomains

Update the environment variables with your free subdomains:

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### Backend CORS Settings
Update CORS in `app.js` to allow your free subdomains:
```javascript
app.use(cors({
  origin: ['https://your-project-name.vercel.app', 'https://your-app-name.onrender.com'],
  credentials: true
}));
```

## ✅ Step 4: Test Deployment

1. **Test Backend**: Visit `https://your-app-name.onrender.com/api/admin/login`
2. **Test Frontend**: Visit `https://your-project-name.vercel.app`
3. **Test Admin Features**: Login and test badge/leaderboard management

## 📊 Step 5: Monitor Performance (Free)

### Vercel Analytics (Free)
- Enable in Vercel project settings
- Monitor page load times and user interactions

### Render Monitoring (Free)
- Check Render dashboard for server health
- Monitor response times and error rates

## 🔒 Security Considerations

1. **Change JWT Secret**: Use a strong, random JWT secret in production
2. **MongoDB Security**: Keep MongoDB credentials secure
3. **HTTPS**: Ensure SSL is enabled (automatic on Vercel/Render)
4. **Environment Variables**: Never commit `.env` files to Git
5. **Rate Limiting**: Consider adding rate limiting to API endpoints

## 🆘 Troubleshooting (Free Tier)

### Backend Issues
- **Connection Refused**: Check MongoDB Atlas IP whitelist
- **Build Fails**: Verify `package.json` scripts are correct
- **Timeout Errors**: Increase timeout in MongoDB connection
- **Spins Down**: Render free tier spins down after inactivity (wakes up on request)

### Frontend Issues
- **Build Fails**: Check for missing dependencies
- **API Errors**: Verify CORS settings and API URL
- **Blank Page**: Check browser console for errors

### Free Tier Limitations
- **Render**: Spins down after 15 minutes inactivity (takes ~30 seconds to wake up)
- **MongoDB Atlas**: 512MB storage limit
- **Vercel**: 100GB bandwidth/month (generous for most apps)

## 💰 Cost Summary (100% Free)

- **Vercel**: $0 (Free tier with generous limits)
- **Render**: $0 (Free tier with spin-down)
- **MongoDB Atlas**: $0 (Free tier 512MB)
- **GitHub**: $0 (Free hosting)
- **Domain**: $0 (Using free subdomains)

**Total Cost: $0/month**

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Free subdomains working
- [ ] SSL certificate active (automatic)
- [ ] Environment variables set
- [ ] API endpoints working
- [ ] User authentication working
- [ ] Admin panel accessible
- [ ] Badge system functional
- [ ] Leaderboard working
- [ ] File uploads working
- [ ] Database connected
- [ ] Monitoring configured

## 🎉 You're Live (100% Free)!

Your Wild Academy application is now deployed completely free. Users can access:
- Main site: `https://your-project-name.vercel.app`
- Admin panel: `https://your-project-name.vercel.app/admin/login`
- API: `https://your-app-name.onrender.com`

## 🔄 Free Tier Wake-up Tips

Since Render free tier spins down when inactive:
- First request may take ~30 seconds to respond
- Subsequent requests will be fast
- Consider using a cron job to keep it awake if needed
- For production, consider upgrading to paid tier ($7/month)

## 📈 Upgrade Path (Optional)

If you need better performance:
- **Render Paid**: $7/month (no spin-down, faster)
- **MongoDB Atlas Paid**: Starting at $9/month (more storage)
- **Custom Domain**: ~$10-15/year (optional)
- **Still very affordable**: ~$25/month for full production setup

For support or issues, check the logs in Vercel and Render dashboards.
