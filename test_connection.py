#!/usr/bin/env python3
"""
Connection Test Script
Tests the TRYONYOU system connections and API endpoints
"""

import sys
def test_backend_import():
    """Test that backend module imports correctly"""
    try:
        from backend.main import app
        print("✅ Backend imports successfully")
        return True
    except Exception as e:
        print(f"❌ Backend import failed: {e}")
        return False

def test_api_wrapper():
    """Test that API wrapper imports correctly"""
    try:
        from api.index import app
        print("✅ API wrapper imports successfully")
        return True
    except Exception as e:
        print(f"❌ API wrapper import failed: {e}")
        return False

def test_matching_engine():
    """Test matching engine functionality"""
    try:
        from backend.matching_engine import MatchingEngine
        import os
        
        garment_db_path = os.path.join('backend', 'garment_database.json')
        if not os.path.exists(garment_db_path):
            print(f"⚠️  Garment database not found at {garment_db_path}")
            return False
            
        engine = MatchingEngine(garment_db_path)
        print(f"✅ Matching engine initialized with {len(engine.garments)} garments")
        return True
    except Exception as e:
        print(f"❌ Matching engine test failed: {e}")
        return False

def test_api_endpoints():
    """Test that API endpoints are defined"""
    try:
        from backend.main import app
        
        # FastAPI routes can be accessed via app.routes
        routes = []
        for route in app.routes:
            # Handle different route types
            if hasattr(route, 'path'):
                routes.append(route.path)
        
        required_endpoints = [
            '/',
            '/api/health',
            '/api/recommend',
            '/api/fit-analysis',
            '/api/garments',
        ]
        
        all_found = True
        for endpoint in required_endpoints:
            if endpoint in routes:
                print(f"✅ Endpoint found: {endpoint}")
            else:
                print(f"❌ Endpoint missing: {endpoint}")
                all_found = False
                
        return all_found
    except Exception as e:
        print(f"❌ API endpoints test failed: {e}")
        return False

def test_frontend_build():
    """Test that frontend build exists"""
    import os
    
    dist_path = 'dist/index.html'
    if os.path.exists(dist_path):
        print("✅ Frontend build exists (dist/index.html)")
        return True
    else:
        print("⚠️  Frontend build not found - run 'npm run build'")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("TRYONYOU SYSTEM CONNECTION TEST")
    print("=" * 60)
    print()
    
    results = []
    
    print("Testing Backend...")
    results.append(test_backend_import())
    print()
    
    print("Testing API Wrapper...")
    results.append(test_api_wrapper())
    print()
    
    print("Testing Matching Engine...")
    results.append(test_matching_engine())
    print()
    
    print("Testing API Endpoints...")
    results.append(test_api_endpoints())
    print()
    
    print("Testing Frontend Build...")
    results.append(test_frontend_build())
    print()
    
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"✅ ALL TESTS PASSED ({passed}/{total})")
        print("🎉 System is properly connected and synchronized!")
        return 0
    else:
        print(f"⚠️  SOME TESTS FAILED ({passed}/{total} passed)")
        print("Please review the errors above")
        return 1

if __name__ == "__main__":
    sys.exit(main())
