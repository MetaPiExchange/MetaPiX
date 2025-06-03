type User = {
  uid: string;
  username: string;
  walletAddress?: string;
};

const users: { [uid: string]: User } = {};

/**
 * Finds an existing user by UID or creates a new one.
 */
export function findOrCreateUser(uid: string, username: string): User {
  if (!users[uid]) {
    users[uid] = {
      uid,
      username,
    };
    console.log(`✅ Created new user: ${username} (${uid})`);
  } else {
    console.log(`👤 Found existing user: ${username} (${uid})`);
  }
  return users[uid];
}

/**
 * Optional: Attach a wallet address to the user
 */
export function setWalletAddress(uid: string, walletAddress: string) {
  if (users[uid]) {
    users[uid].walletAddress = walletAddress;
    console.log(`🔗 Wallet address for user ${uid} set to ${walletAddress}`);
  }
}

/**
 * Optional: Get user wallet address
 */
export function getWalletAddress(uid: string): string | undefined {
  return users[uid]?.walletAddress;
}

export default {
  findOrCreateUser,
  setWalletAddress,
  getWalletAddress,
};
