# ProMail - Your Smartest AI Composer

ProMail is an AI-powered tool that runs **entirely on your local computer**. It uses the Google Gemini API to generate tailored email newsletters.

## How to Run ProMail on Your Computer

To get the application working locally, you'll need two things: an API key to access the AI model and a simple web server to serve the app files.

### Step 1: Get Your Free API Key

The application needs a Google Gemini API key to power its AI features. You only need to do this once.

1.  Visit the [Google AI Studio](https://aistudio.google.com/app/apikey) website.
2.  Click the "**Create API key**" button.
3.  Copy the generated key. It will be a long string of letters and numbers.

> **Note:** The Google AI Studio link is **only** for generating your personal API key. The ProMail application does **not** run there; it runs on your machine using the instructions below.

### Step 2: Configure The Application

Now, you need to tell the application what your API key is.

1.  In the same folder as the `index.html` file, create a new file and name it exactly `env.js`.
2.  Open `env.js` and add the following code. Paste your API key where it says `"YOUR_API_KEY_HERE"`.

    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: "YOUR_API_KEY_HERE"
      }
    };
    ```
    > **Security Tip**: This file contains your secret key. If you are using version control like Git, make sure to add `env.js` to your `.gitignore` file to avoid accidentally sharing it.

### Step 3: Start a Local Web Server

Because of browser security rules, you can't just open `index.html` directly from your file system. You need a simple local web server. Here are the easiest ways to start one from your project's folder using the command line:

#### Option A: Using Python (Usually built-in on macOS and Linux)
If you have Python installed, run one of these commands:

- For Python 3:
  ```bash
  python -m http.server
  ```
- For Python 2:
  ```bash
  python -m SimpleHTTPServer
  ```

#### Option B: Using Node.js / npm
If you have Node.js installed, this is a great one-line command:

```bash
npx http-server
```

### Step 4: Open ProMail in Your Browser

After starting the server, your terminal will show a local address. Open your web browser and go to that address. It will likely be one of these:

- **`http://localhost:8000`**
- **`http://127.0.0.1:8000`**

(The port number might be different, like `8080`. Just check the output in your terminal.)

That's it! ProMail is now running independently on your local machine.
