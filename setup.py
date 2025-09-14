#!/usr/bin/env python3
"""
Setup script for FOSSEE Workshop Booking System
Enhanced UI/UX Version
"""

import os
import sys
import subprocess
import django
from django.core.management import execute_from_command_line

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Python 3.7 or higher is required")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")

def setup_environment():
    """Setup the development environment"""
    print("🚀 Setting up FOSSEE Workshop Booking System - Enhanced UI/UX")
    print("=" * 60)
    
    # Check Python version
    check_python_version()
    
    # Check if virtual environment exists
    if not os.path.exists('venv'):
        print("\n📦 Creating virtual environment...")
        if not run_command('python -m venv venv', 'Virtual environment creation'):
            sys.exit(1)
    
    # Activate virtual environment and install requirements
    if os.name == 'nt':  # Windows
        activate_cmd = 'venv\\Scripts\\activate'
        pip_cmd = 'venv\\Scripts\\pip'
        python_cmd = 'venv\\Scripts\\python'
    else:  # Unix/Linux/MacOS
        activate_cmd = 'source venv/bin/activate'
        pip_cmd = 'venv/bin/pip'
        python_cmd = 'venv/bin/python'
    
    # Install requirements
    if not run_command(f'{pip_cmd} install -r requirements.txt', 'Installing dependencies'):
        sys.exit(1)
    
    # Setup Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'workshop_portal.settings')
    
    try:
        django.setup()
    except Exception as e:
        print(f"❌ Django setup failed: {e}")
        sys.exit(1)
    
    # Run migrations
    if not run_command(f'{python_cmd} manage.py migrate', 'Running database migrations'):
        sys.exit(1)
    
    # Collect static files
    if not run_command(f'{python_cmd} manage.py collectstatic --noinput', 'Collecting static files'):
        print("⚠️  Static files collection failed, but continuing...")
    
    print("\n" + "=" * 60)
    print("🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Create a superuser account:")
    print(f"   {python_cmd} manage.py createsuperuser")
    print("\n2. Start the development server:")
    print(f"   {python_cmd} manage.py runserver")
    print("\n3. Open your browser and navigate to:")
    print("   http://localhost:8000")
    print("\n🌟 Enjoy the enhanced UI/UX experience!")
    print("\n📚 For more information, check the README.md file")

if __name__ == '__main__':
    setup_environment()

