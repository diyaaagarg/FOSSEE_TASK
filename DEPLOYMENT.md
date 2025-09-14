# Deployment Guide - FOSSEE Workshop Booking System

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
python setup.py
```

### Option 2: Manual Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix/Linux/MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Start development server
python manage.py runserver
```

## 🧪 Testing the Enhancements

Run the test script to verify all enhancements are working:
```bash
python test_ui_enhancements.py
```

## 📱 Mobile Testing

1. **Browser Developer Tools**
   - Open Chrome/Firefox Developer Tools
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test different device sizes

2. **Real Device Testing**
   - Access the application from your mobile device
   - Test touch interactions and navigation
   - Verify responsive behavior

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
```

### Static Files
The enhanced static files are automatically included:
- `workshop_app/static/workshop_app/css/modern-ui.css`
- `workshop_app/static/workshop_app/js/modern-ui.js`

## 🌐 Production Deployment

### 1. Configure Production Settings
```python
# In settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
STATIC_ROOT = '/path/to/static/files'
```

### 2. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 3. Database Migration
```bash
python manage.py migrate
```

### 4. Web Server Configuration
Configure your web server (Nginx/Apache) to serve static files and proxy to Django.

## 📊 Performance Monitoring

### Key Metrics to Monitor
- Page load times
- Mobile responsiveness
- User interaction rates
- Accessibility compliance

### Tools for Monitoring
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest.org

## 🔍 Troubleshooting

### Common Issues

1. **Static Files Not Loading**
   ```bash
   python manage.py collectstatic --clear
   ```

2. **CSS/JS Not Applied**
   - Clear browser cache
   - Check browser console for errors
   - Verify static file paths

3. **Mobile Issues**
   - Test on actual devices
   - Check viewport meta tag
   - Verify touch event handling

### Debug Mode
Enable debug mode for development:
```python
DEBUG = True
```

## 📞 Support

For deployment issues or questions:
- **Email**: pythonsupport@fossee.in
- **Documentation**: Check README.md
- **Issues**: Report on the project repository

---

**Happy Deploying! 🎉**

