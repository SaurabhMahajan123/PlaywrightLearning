import { test, expect } from "@playwright/test"

// open website and fill the form and click on login button and check the error message
test("open google.com", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[id='username']").fill("rahulshetty");
    await page.locator("[id='password']").fill("learning");
    await page.locator("[id='terms']").click();
    await page.locator("[id='username']").fill("");
    await page.locator("[id='username']").fill("rahulshetty");
    await page.locator("[id='signInBtn']").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); 
})

// open the webiste  and wait for the network to be idle and get all the phones names and print them in console
test("get all phones names", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[id='username']").fill("rahulshettyacademy");
    await page.locator("[id='password']").fill("Learning@830$3mK2");
    await page.locator("[id='terms']").click();
    await page.locator("[id='signInBtn']").click();
    // await page.locator("[class = 'card-title'] a").first().textContent();
    await page.waitForLoadState('networkidle');
    const allphones = await page.locator("[class = 'card-title'] a").allTextContents();
    console.log( await allphones);
    
})


// open the website and handle drowpdown

test("handle dropdown",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[id='username']").fill("rahulshettyacademy");
    await page.locator("[id='password']").fill("Learning@830$3mK2");
    await page.locator("select.form-control").selectOption("teach");
    await page.locator("[id='terms']").click();
    await page.pause(2000);

})

// open the website and assert checkbox/radio button

test("validate checkbox/radio button", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[id='username']").fill("rahulshettyacademy");
    await page.locator("[id='password']").fill("Learning@830$3mK2");
    // await page.locator("label.customradio").last().click();
    // expect(await page.locator("label.customradio").last()).toBeChecked();
    // other way of as
    expect(await page.locator("label.customradio").last().isChecked()).toBeTruthy();
    await page.pause(2000);
})

// child window handling

test("child window handling", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("a.blinkingText").first().click()
        
    ]);

    let text = await newpage.locator("p.red").textContent();
    const arraytext = text.split("@");
    console.log(arraytext[0].split(" ")[0]);
     await page.pause();
    // now interacting with the parent page
    await page.locator("[id='username']").fill("rahulshettyacademy");
    await page.pause();
    await page.locator("[id='password']").fill("Learning@830$3mK2");
   

})



// different advance locators

test.only("different advance locators", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill("abc");
    await page.getByRole("button",{name:'Submit'}).click();
    
})