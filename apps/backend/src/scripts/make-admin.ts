import 'dotenv/config';
import { db } from '../lib/db';

async function makeUserAdmin(email: string) {
  try {
    const user = await db.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    console.log(`✅ Usuario ${user.email} actualizado a ADMIN`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Nombre: ${user.name}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.$disconnect();
  }
}

// Obtener el email del primer argumento de la línea de comandos
const email = process.argv[2];

if (!email) {
  console.error('❌ Debes proporcionar un email: pnpm make-admin email@example.com');
  process.exit(1);
}

makeUserAdmin(email);
