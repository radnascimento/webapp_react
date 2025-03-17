// hashHelper.js

export default class HashHelper {
    // Hash the ID using SHA-256
    static async hashId(id) {
        const encoder = new TextEncoder();
        const data = encoder.encode(id.toString());

        // Hash the data using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Convert the ArrayBuffer to a hex string
        return this.bufferToHex(hashBuffer);
    }

    // Convert ArrayBuffer to a hex string
    static bufferToHex(buffer) {
        const hexArray = Array.from(new Uint8Array(buffer));
        return hexArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
}
