import 'dotenv/config';
import { db } from '../lib/db';

async function listUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    
    console.log('\n📋 Usuarios en la base de datos:\n');
    users.forEach((user) => {
      console.log(`  ${user.role === 'ADMIN' ? '👑' : '👤'} ${user.email}`);
      console.log(`     Nombre: ${user.name}`);
      console.log(`     Rol: ${user.role || 'USER'}`);
      console.log('');
    });
    
    console.log(`Total: ${users.length} usuario(s)\n`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.$disconnect();
  }
}

listUsers();
