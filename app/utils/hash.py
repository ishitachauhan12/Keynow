from passlib.context import CryptContext
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import os

pwd_context = CryptContext(schemes=["bcrypt"])

SECRET_KEY = os.environ.get('SECRET_KEY').encode('utf-8')
cipher = AES.new(SECRET_KEY, AES.MODE_ECB)

def encrypt(plaintext: str) -> str:
    plaintext = plaintext.encode('utf-8')
    padded_plaintext = pad(plaintext, AES.block_size)
    ciphertext = cipher.encrypt(padded_plaintext)
    encrypted = base64.b64encode(ciphertext).decode('utf-8')
    return encrypted

def decrypt(encrypted: str) -> str:
    encrypted = base64.b64decode(encrypted.encode('utf-8'))
    ciphertext = cipher.decrypt(encrypted)
    plaintext = unpad(ciphertext, AES.block_size).decode('utf-8')
    return plaintext
