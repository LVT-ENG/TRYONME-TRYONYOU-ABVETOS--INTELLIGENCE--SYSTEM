import { PrismaClient, Garment, GarmentVariant, GarmentCategory } from '@prisma/client';

const prisma = new PrismaClient();

export class CatalogService {
  
  async createGarment(data: {
    brandId: string;
    sku: string;
    name: string;
    category: GarmentCategory;
    elasticity: number;
    variants: Array<{
      sizeLabel: string;
      chestWidth?: number;
      waistWidth?: number;
      hipWidth?: number;
    }>;
  }): Promise<Garment & { variants: GarmentVariant[] }> {
    
    return await prisma.garment.create({
      data: {
        brandId: data.brandId,
        sku: data.sku,
        name: data.name,
        category: data.category,
        elasticity: data.elasticity,
        variants: {
          create: data.variants,
        },
      },
      include: {
        variants: true,
      },
    });
  }

  async getGarmentBySku(sku: string) {
    return await prisma.garment.findUnique({
      where: { sku },
      include: { variants: true, brand: true },
    });
  }

  /**
   * Retrieves all variants for a specific category to run batch fit analysis.
   */
  async getVariantsByCategory(category: GarmentCategory) {
    return await prisma.garmentVariant.findMany({
      where: {
        garment: {
          category: category,
        },
      },
      include: {
        garment: true,
      },
    });
  }
}
