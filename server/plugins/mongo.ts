import mongoose from 'mongoose';
import type { Nitro } from 'nitropack';

export default (nitroApp: Nitro) => {
  const config = useRuntimeConfig();
  _connectMongoDB(config.MONGO_URI);

  nitroApp.hooks.hook('close', async () => {
    await _disconnectMongoDB();
  });
};

async function _connectMongoDB(uri: string) {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

async function _disconnectMongoDB() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
}
