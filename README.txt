PROJECT REQUIREMENTS

Your RSA game must include the following features:

Stage 1: Prime Number Selection (Challenge 1)
The game will ask the player to select two large prime numbers (p and q).
The game should have a feature to validate if the selected numbers are prime.

Stage 2: Key Generation (Challenge 2)
Once the player selects two prime numbers, the game should:
Compute n = p * q
Compute ϕ(n) = (p-1)(q-1)
Ask the player to choose an appropriate public key exponent (e) from the list of possible values.
Calculate the private key (d) using modular multiplicative inverse.

Stage 3: Encryption (Challenge 3)
The player will enter a plain text message, and the game will:
Convert the text to numerical values (ASCII codes).
Encrypt the message using the public key (n, e).
Display the encrypted message.

Stage 4: Decryption (Challenge 4)
The game will provide the encrypted message back to the player, and they must:
Use the private key (n, d) to decrypt it.
Verify if the decrypted message matches the original plain text.



FEATURES

1. Time Attack Mode:
Give players a limited time to solve each challenge.

2. Difficulty Levels:
Provide different levels (Easy, Medium, Hard) with increasing prime number sizes.

3. Leaderboard:
Keep a scoreboard to track the fastest players.



SAMPLE GAME FLOW

1. Welcome to the RSA Game!
Choose your difficulty level: [Easy / Medium / Hard]

2. Stage 1: Prime Number Selection
Enter your first prime number (p):
Enter your second prime number (q):

3. Stage 2: Key Generation
Calculating n and ϕ(n)...
Select a public key exponent (e):
Private key (d) calculated!

4. Stage 3: Encryption
Enter a message to encrypt:
Your encrypted message: [Encrypted Text]

5. Stage 4: Decryption
Decrypt the following message: [Encrypted Text]
Enter your private key (d):
Your decrypted message is: [Decrypted Text]