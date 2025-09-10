import * as admin from 'firebase-admin';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require(join(process.cwd(), 'config/firebase.json'));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export { admin };
