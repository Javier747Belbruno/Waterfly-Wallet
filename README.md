# WaterFly Wallet: a simple Iota wallet using Wallet.rs binding.

## Desc: Manage multiple accounts and check address, balance and send IOTA tokens.

## Features

v1.0

-   [x] Create a new account.
-   [x] Handle multiple accounts.
-   [x] Check balance.
-   [x] Show address.
-   [x] Send IOTA to other wallets.

v1.0.1

-   [x] error folder creation.
-   [x] delete console log backend side.

v1.0.2

-   [ ] error fix account display, bad format for account name, After creating a new account I think. See acount.svelte.
-   [ ] Add tailwind.

v1.1

-   [ ] Create a backup of your wallet.
-   [ ] Restore your wallet from a backup.
-   [ ] Localizate account files in home directory (linux,windows 10).
-   [ ] See how to reproduce Rust errors in node js.

## Build

-   npm install
-   npm run desktop (dev)
-   npm run build:linux (Release in AppImage format)

## Product Notes:

-   All addresses and balance run over Chrysalis Devnet Network.
-   For safety, User can't change the to prod.

## Dev Notes:

-   Electron v17.x doesn't build.
