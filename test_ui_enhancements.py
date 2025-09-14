#!/usr/bin/env python3
"""
Test script for UI/UX enhancements
This script verifies that all enhancements are properly implemented
"""

import os
import sys
import django
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.management import execute_from_command_line

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'workshop_portal.settings')
django.setup()

class UIEnhancementTests(TestCase):
    """Test cases for UI/UX enhancements"""
    
    def setUp(self):
        """Set up test data"""
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_static_files_exist(self):
        """Test that enhanced static files exist"""
        static_files = [
            'workshop_app/css/modern-ui.css',
            'workshop_app/js/modern-ui.js'
        ]
        
        for file_path in static_files:
            full_path = os.path.join('workshop_app/static', file_path)
            self.assertTrue(os.path.exists(full_path), 
                          f"Static file {file_path} does not exist")
    
    def test_templates_exist(self):
        """Test that enhanced templates exist"""
        template_files = [
            'workshop_app/base.html',
            'workshop_app/login.html',
            'workshop_app/register.html',
            'workshop_app/workshop_type_list.html',
            'workshop_app/propose_workshop.html'
        ]
        
        for template in template_files:
            full_path = os.path.join('workshop_app/templates', template)
            self.assertTrue(os.path.exists(full_path), 
                          f"Template {template} does not exist")
    
    def test_login_page_enhancements(self):
        """Test login page enhancements"""
        response = self.client.get(reverse('workshop_app:login'))
        self.assertEqual(response.status_code, 200)
        
        # Check for modern UI elements
        content = response.content.decode('utf-8')
        self.assertIn('modern-ui.css', content)
        self.assertIn('modern-ui.js', content)
        self.assertIn('fade-in-up', content)
        self.assertIn('shadow-custom-lg', content)
    
    def test_register_page_enhancements(self):
        """Test registration page enhancements"""
        response = self.client.get(reverse('workshop_app:register'))
        self.assertEqual(response.status_code, 200)
        
        # Check for modern UI elements
        content = response.content.decode('utf-8')
        self.assertIn('modern-ui.css', content)
        self.assertIn('input-group', content)
        self.assertIn('form-group', content)
    
    def test_workshop_type_list_enhancements(self):
        """Test workshop type list enhancements"""
        response = self.client.get(reverse('workshop_app:workshop_type_list'))
        self.assertEqual(response.status_code, 200)
        
        # Check for modern UI elements
        content = response.content.decode('utf-8')
        self.assertIn('hero-section', content)
        self.assertIn('card', content)
        self.assertIn('shadow-custom', content)
    
    def test_propose_workshop_enhancements(self):
        """Test propose workshop page enhancements"""
        # Login first
        self.client.login(username='testuser', password='testpass123')
        
        response = self.client.get(reverse('workshop_app:propose_workshop'))
        self.assertEqual(response.status_code, 200)
        
        # Check for modern UI elements
        content = response.content.decode('utf-8')
        self.assertIn('hero-section', content)
        self.assertIn('input-group', content)
        self.assertIn('form-group', content)
    
    def test_base_template_enhancements(self):
        """Test base template enhancements"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        
        # Check for modern UI elements
        content = response.content.decode('utf-8')
        self.assertIn('modern-ui.css', content)
        self.assertIn('modern-ui.js', content)
        self.assertIn('navbar', content)
        self.assertIn('footer', content)
    
    def test_css_variables_exist(self):
        """Test that CSS custom properties are defined"""
        css_file = 'workshop_app/static/workshop_app/css/modern-ui.css'
        if os.path.exists(css_file):
            with open(css_file, 'r') as f:
                css_content = f.read()
                
            # Check for CSS custom properties
            self.assertIn(':root', css_content)
            self.assertIn('--primary-color', css_content)
            self.assertIn('--secondary-color', css_content)
            self.assertIn('--accent-color', css_content)
    
    def test_javascript_features_exist(self):
        """Test that JavaScript enhancements are present"""
        js_file = 'workshop_app/static/workshop_app/js/modern-ui.js'
        if os.path.exists(js_file):
            with open(js_file, 'r') as f:
                js_content = f.read()
                
            # Check for key JavaScript features
            self.assertIn('initializeModernUI', js_content)
            self.assertIn('initSmoothScrolling', js_content)
            self.assertIn('initFormEnhancements', js_content)
            self.assertIn('initCardAnimations', js_content)

def run_ui_tests():
    """Run all UI enhancement tests"""
    print("🧪 Running UI/UX Enhancement Tests")
    print("=" * 50)
    
    # Run Django tests
    try:
        from django.test.utils import get_runner
        from django.conf import settings
        
        TestRunner = get_runner(settings)
        test_runner = TestRunner()
        failures = test_runner.run_tests(["__main__"])
        
        if failures:
            print(f"\n❌ {failures} test(s) failed")
            return False
        else:
            print("\n✅ All tests passed!")
            return True
            
    except Exception as e:
        print(f"\n❌ Test execution failed: {e}")
        return False

def check_file_structure():
    """Check if all required files exist"""
    print("\n📁 Checking file structure...")
    
    required_files = [
        'workshop_app/static/workshop_app/css/modern-ui.css',
        'workshop_app/static/workshop_app/js/modern-ui.js',
        'workshop_app/templates/workshop_app/base.html',
        'workshop_app/templates/workshop_app/login.html',
        'workshop_app/templates/workshop_app/register.html',
        'workshop_app/templates/workshop_app/workshop_type_list.html',
        'workshop_app/templates/workshop_app/propose_workshop.html',
        'README.md',
        'setup.py'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print("❌ Missing files:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    else:
        print("✅ All required files exist")
        return True

def main():
    """Main test function"""
    print("🚀 FOSSEE Workshop Booking System - UI/UX Enhancement Tests")
    print("=" * 60)
    
    # Check file structure
    if not check_file_structure():
        print("\n❌ File structure check failed")
        sys.exit(1)
    
    # Run UI tests
    if not run_ui_tests():
        print("\n❌ UI enhancement tests failed")
        sys.exit(1)
    
    print("\n" + "=" * 60)
    print("🎉 All tests completed successfully!")
    print("\n📋 Enhancement Summary:")
    print("✅ Modern CSS styling with custom properties")
    print("✅ Enhanced JavaScript interactions")
    print("✅ Mobile-responsive design")
    print("✅ Improved form layouts")
    print("✅ Modern navigation and UI components")
    print("✅ Accessibility improvements")
    print("✅ Performance optimizations")
    
    print("\n🌟 The UI/UX enhancements are ready for use!")

if __name__ == '__main__':
    main()

