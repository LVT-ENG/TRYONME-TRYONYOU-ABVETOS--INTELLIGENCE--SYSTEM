"""
Garment Database for TRYONYOU Pilot
Realistic but fictitious Lafayette-like dataset
"""

GARMENTS = [
    {
        "id": "laf_blazer_001",
        "name": "Heritage Navy Blazer",
        "brand": "Lafayette Couture",
        "category": "blazer",
        "price": 1890,
        "image_url": "/images/blazer_navy.jpg",
        "sizes": {
            "XS": {"chest": 84, "waist": 74, "shoulder": 38, "length": 68, "sleeve": 58},
            "S": {"chest": 90, "waist": 80, "shoulder": 40, "length": 70, "sleeve": 60},
            "M": {"chest": 96, "waist": 86, "shoulder": 42, "length": 72, "sleeve": 62},
            "L": {"chest": 102, "waist": 92, "shoulder": 44, "length": 74, "sleeve": 64},
            "XL": {"chest": 108, "waist": 98, "shoulder": 46, "length": 76, "sleeve": 66},
        },
        "fabric": {
            "elasticity": 5,  # % stretch
            "drape_score": 7,  # 1-10 (higher = more drape)
            "rigidity": 3,  # 1-10 (higher = stiffer)
            "material": "100% virgin wool"
        },
        "cut_type": "slim",
        "occasions": ["work", "formal", "event"],
        "description": "Classic navy blazer with modern tailoring, perfect for formal occasions"
    },
    {
        "id": "laf_shirt_001",
        "name": "White Oxford Button-Down",
        "brand": "Lafayette Couture",
        "category": "shirt",
        "price": 450,
        "image_url": "/images/shirt_oxford.jpg",
        "sizes": {
            "XS": {"chest": 86, "waist": 76, "shoulder": 38, "length": 66, "sleeve": 56},
            "S": {"chest": 92, "waist": 82, "shoulder": 40, "length": 68, "sleeve": 58},
            "M": {"chest": 98, "waist": 88, "shoulder": 42, "length": 70, "sleeve": 60},
            "L": {"chest": 104, "waist": 94, "shoulder": 44, "length": 72, "sleeve": 62},
            "XL": {"chest": 110, "waist": 100, "shoulder": 46, "length": 74, "sleeve": 64},
        },
        "fabric": {
            "elasticity": 2,  # % stretch
            "drape_score": 5,  # 1-10
            "rigidity": 4,  # 1-10
            "material": "100% cotton"
        },
        "cut_type": "regular",
        "occasions": ["work", "casual", "formal"],
        "description": "Crisp white oxford with button-down collar, versatile classic"
    },
    {
        "id": "laf_dress_001",
        "name": "Noir Couture Evening Dress",
        "brand": "Lafayette Couture",
        "category": "dress",
        "price": 3200,
        "image_url": "/images/dress_noir.jpg",
        "sizes": {
            "XS": {"chest": 80, "waist": 64, "shoulder": 36, "length": 140, "sleeve": 0},
            "S": {"chest": 86, "waist": 70, "shoulder": 38, "length": 142, "sleeve": 0},
            "M": {"chest": 92, "waist": 76, "shoulder": 40, "length": 144, "sleeve": 0},
            "L": {"chest": 98, "waist": 82, "shoulder": 42, "length": 146, "sleeve": 0},
            "XL": {"chest": 104, "waist": 88, "shoulder": 44, "length": 148, "sleeve": 0},
        },
        "fabric": {
            "elasticity": 8,  # % stretch
            "drape_score": 9,  # 1-10 (very drape-heavy)
            "rigidity": 1,  # 1-10 (very soft)
            "material": "100% silk charmeuse"
        },
        "cut_type": "fitted",
        "occasions": ["formal", "event", "ceremony"],
        "description": "Black silk evening dress with elegant drape, haute couture quality"
    },
    {
        "id": "laf_trousers_001",
        "name": "Tailored Charcoal Trousers",
        "brand": "Lafayette Couture",
        "category": "trousers",
        "price": 650,
        "image_url": "/images/trousers_charcoal.jpg",
        "sizes": {
            "XS": {"waist": 72, "hips": 88, "length": 98, "inseam": 78},
            "S": {"waist": 78, "hips": 94, "length": 100, "inseam": 80},
            "M": {"waist": 84, "hips": 100, "length": 102, "inseam": 82},
            "L": {"waist": 90, "hips": 106, "length": 104, "inseam": 84},
            "XL": {"waist": 96, "hips": 112, "length": 106, "inseam": 86},
        },
        "fabric": {
            "elasticity": 3,  # % stretch
            "drape_score": 6,  # 1-10
            "rigidity": 4,  # 1-10
            "material": "100% wool"
        },
        "cut_type": "slim",
        "occasions": ["work", "formal"],
        "description": "Tailored charcoal trousers with perfect crease, professional elegance"
    },
    {
        "id": "laf_jeans_001",
        "name": "Premium Dark Indigo Denim",
        "brand": "Lafayette Couture",
        "category": "jeans",
        "price": 320,
        "image_url": "/images/jeans_indigo.jpg",
        "sizes": {
            "XS": {"waist": 74, "hips": 90, "length": 100, "inseam": 80},
            "S": {"waist": 80, "hips": 96, "length": 102, "inseam": 82},
            "M": {"waist": 86, "hips": 102, "length": 104, "inseam": 84},
            "L": {"waist": 92, "hips": 108, "length": 106, "inseam": 86},
            "XL": {"waist": 98, "hips": 114, "length": 108, "inseam": 88},
        },
        "fabric": {
            "elasticity": 4,  # % stretch
            "drape_score": 4,  # 1-10
            "rigidity": 6,  # 1-10 (stiffer)
            "material": "99% cotton, 1% elastane"
        },
        "cut_type": "regular",
        "occasions": ["casual"],
        "description": "Premium dark indigo denim with subtle stretch, timeless classic"
    },
    {
        "id": "laf_sweater_001",
        "name": "Merino Wool Crewneck",
        "brand": "Lafayette Couture",
        "category": "sweater",
        "price": 580,
        "image_url": "/images/sweater_merino.jpg",
        "sizes": {
            "XS": {"chest": 88, "waist": 78, "shoulder": 38, "length": 62, "sleeve": 56},
            "S": {"chest": 94, "waist": 84, "shoulder": 40, "length": 64, "sleeve": 58},
            "M": {"chest": 100, "waist": 90, "shoulder": 42, "length": 66, "sleeve": 60},
            "L": {"chest": 106, "waist": 96, "shoulder": 44, "length": 68, "sleeve": 62},
            "XL": {"chest": 112, "waist": 102, "shoulder": 46, "length": 70, "sleeve": 64},
        },
        "fabric": {
            "elasticity": 6,  # % stretch
            "drape_score": 8,  # 1-10 (soft drape)
            "rigidity": 2,  # 1-10 (very soft)
            "material": "100% merino wool"
        },
        "cut_type": "regular",
        "occasions": ["casual", "work"],
        "description": "Luxurious merino wool crewneck, breathable and temperature-regulating"
    },
    {
        "id": "laf_jacket_leather_001",
        "name": "Italian Leather Biker Jacket",
        "brand": "Lafayette Couture",
        "category": "jacket",
        "price": 2400,
        "image_url": "/images/jacket_leather.jpg",
        "sizes": {
            "XS": {"chest": 88, "waist": 80, "shoulder": 40, "length": 58, "sleeve": 58},
            "S": {"chest": 94, "waist": 86, "shoulder": 42, "length": 60, "sleeve": 60},
            "M": {"chest": 100, "waist": 92, "shoulder": 44, "length": 62, "sleeve": 62},
            "L": {"chest": 106, "waist": 98, "shoulder": 46, "length": 64, "sleeve": 64},
            "XL": {"chest": 112, "waist": 104, "shoulder": 48, "length": 66, "sleeve": 66},
        },
        "fabric": {
            "elasticity": 1,  # % stretch (leather doesn't stretch much)
            "drape_score": 3,  # 1-10 (structured)
            "rigidity": 8,  # 1-10 (very stiff initially)
            "material": "100% Italian leather"
        },
        "cut_type": "slim",
        "occasions": ["casual", "event"],
        "description": "Iconic Italian leather biker jacket, ages beautifully with character"
    },
]

def get_garment_by_id(garment_id: str):
    """Retrieve a garment by its ID"""
    for garment in GARMENTS:
        if garment["id"] == garment_id:
            return garment
    return None

def get_garments_by_category(category: str):
    """Retrieve all garments in a category"""
    return [g for g in GARMENTS if g["category"] == category]

def get_garments_by_occasion(occasion: str):
    """Retrieve all garments suitable for an occasion"""
    return [g for g in GARMENTS if occasion in g["occasions"]]

def get_all_garments():
    """Retrieve all garments"""
    return GARMENTS
