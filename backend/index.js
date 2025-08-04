try {
    console.log('Starting server from index.js...');
    await import('./server.js');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }