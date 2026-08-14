import { prisma } from './db';
import { redis } from './redis';

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

/**
 * Reads the current view count from Postgres and writes it to Redis.
 * Call this AFTER updateViewsCount() so Redis always reflects the
 * authoritative DB value — not just a locally-incremented counter.
 */
export async function syncRedis(): Promise<number> {
  try {
    const count = await getViewsCount();   // source of truth → Postgres
    await redis.set('viewer', count);       // overwrite Redis with real value
    return count;
  } catch (error) {
    console.error('[syncRedis] Failed to sync Redis from DB:', error);
    throw error;
  }
}
