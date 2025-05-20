# Site-Note

**Idea here is to save notes for particular site on browser itself using this extension**
<br>

## Why it exist

A lot of times, people bookmark websites but later forget why they bookmarked them.
This can help them save the website URL along with a note explaining why they saved that page.

## How to add this extension to browsers(Chromium based browser)
For now this extension is not available via chrome web store but soon will be

**Step 1:** Get copy of this repository in your system

Clone using git Command:
``` GIT Clone
git clone https://github.com/MrKumaran/Site-Note.git
```
and Zip the folder


or Download via [link](https://github.com/MrKumaran/Site-Note/archive/refs/heads/main.zip) (Already zipped file)


**Step 2:** Navigate to your browser manage extension tab and enable developer mode


**Step 3:** Select Load unpacked and select .zip file you downloaded and Done!

### Tip

Use this extension with [Wayback machine](https://chromewebstore.google.com/detail/fpnmgdkabkmnadcjpehmlllkndpkmiak?utm_source=item-share-cb) extension, which will help incase website is down or no longer exist


### File Structure
```
    │── assests -> (dir) Contains Favicons
    │── SS -> (dir) contains screenshots
    │── popUp
    │    │── index.html
    │    │── index.css
    │    └── index.js
    ├── manifest.json
    └── README.md
```

## Tech tab

If any bug or need any feature kindly open an issue in issue tab in [github issue](https://github.com/MrKumaran/Site-Note/issues)

**Before opening an issue, See issues in open as well as closed ones.*


Pull request are welcomed for optimization and new feature.

---

**Issue format:**

**Title:** [bug/feature] <bug/feature title>

**Description:**

**For Bug*

Add SS and clearly mention steps to reproduce that bug With browser details(name, version) and OS(Optional).

If found a bug also a solution to it then open an issue and close the issue by yourself.


**For feature*

Explain what feature you want clearly, if some product has that feature mention that.

---
**Pull request format:**


**Title:** [Bug solution/feature] <Bug solution/feature title>


**Description:**

**For Bug*

Mention an issue title along with #No. also What changes made in code and why.


**For feature*

If feature asked in an issue mention issue title along with #No.
else explain feature added, why(Optional).



Thank you!
