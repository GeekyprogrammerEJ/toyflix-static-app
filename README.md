# Toyflix Static Web App

This is a static web application that serves as a frontend proxy to the WordPress backend.

## Architecture

- **Frontend**: Azure Static Web App (HTML, CSS, JavaScript)
- **Backend**: WordPress on Azure VM (4.213.183.90)
- **API**: WordPress REST API
- **Admin**: Direct redirect to WordPress admin panel

## Features

- ✅ Static content served from Azure CDN
- ✅ Dynamic content from WordPress API
- ✅ Admin panel access via redirect
- ✅ Responsive design
- ✅ SEO-friendly routing

## Deployment

### Prerequisites

- Azure CLI installed and logged in
- Azure subscription with Static Web Apps enabled

### Deploy to Azure Static Web Apps

1. **Create Static Web App:**
```bash
az staticwebapp create \
  --name toyflix-static-app \
  --resource-group your-resource-group \
  --source . \
  --location eastus \
  --branch main
```

2. **Deploy from local directory:**
```bash
az staticwebapp deploy \
  --source . \
  --name toyflix-static-app \
  --resource-group your-resource-group
```

### Alternative: Deploy via GitHub

1. Push this code to a GitHub repository
2. Connect the repository to Azure Static Web Apps
3. Enable automatic deployments

## Configuration

The `staticwebapp.config.json` file handles:
- Route redirects to WordPress backend
- CORS headers for API access
- Admin panel access
- Fallback routing for SPA

## WordPress Backend

- **URL**: https://4.213.183.90
- **Admin**: https://4.213.183.90/wp-admin
- **API**: https://4.213.183.90/wp-json/wp/v2

## Customization

- Modify `script.js` to change API endpoints
- Update `styles.css` for branding
- Edit `index.html` for content structure
- Adjust `staticwebapp.config.json` for routing rules

## Benefits

- 🚀 **Performance**: Azure CDN for static assets
- 🔒 **Security**: Built-in authentication
- 📱 **Responsive**: Mobile-friendly design
- 🔧 **Scalable**: Automatic scaling
- 💰 **Cost-effective**: Pay per use model 