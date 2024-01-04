from cryptography.fernet import Fernet

key = Fernet.generate_key()
print("Generated a new encryption key. Make sure to save this somewhere safe:")
print(key)