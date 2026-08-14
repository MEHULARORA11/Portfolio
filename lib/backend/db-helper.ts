import { prisma } from './db';

export async function updateViewsCount() {
  try {
    const existing = await prisma.views?.findFirst();

    if (!existing) {
      const created = await prisma.views.create({
        data: { viewsCount: 1 },
      });
      return created.viewsCount;
    }

    const updated = await prisma.views.update({
      where: { id: existing.id },
      data: {
        viewsCount: { increment: 1 },
      },
    });

    return updated.viewsCount;
  } catch (error) {
    console.error('Error updating views count:', error);
    throw error;
  }
}

export async function getViewsCount() {
  try {
    const existing = await prisma.views?.findFirst();
    return existing ? existing.viewsCount : 0;
  } catch (error) {
    console.error('Error fetching views count:', error);
    throw error;
  }
}
