import { test, expect } from "@playwright/test"


// to run particular test file
// command  :-    npx playwright test  filename.spec.js

// to run test in file in debug mode
// command  :-    npx playwright test  filename.spec.js --debug 




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

test("different advance locators", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill("abc");
    await page.getByRole("button",{name:'Submit'}).click();
    
})



// wait and timeout strategy > explicitly wait at assertion level or action level. in playwright we have 3 ways to intialise or mention timeout

// a. assertion timeout
// 1. Statement level >> await expect(page.locator(".fa-home")).toBeVisible({timeout : 100000});   >> step level
// 2. Global level >> in playwright.spec.js  we need to update timout in expect block >> this is called global timeout
// 3. test case level >>   const  updateExpect = expect.configure{{timeout : 100000}}
// then use   await updateExpect(page.locator(".fa-home")).toBeVisible(); this is called test case level

// b. action timeout >  all action method are relying on total test timeout but if any actions are taking
// time in that case we can add timeout for action as well.
// 1. Global level >> in playwrigh.spec.js  we have to add actionTimeout and  navigationTimeout in  use block > this is timeout will applicable for all action methods
// 2. Test case level >> page.setdefaultTimeout(10000);
// 3. step level >>  it is simmilar to assertion timeout in statement we have add {timeout : value} in action method

// priority  step level > test level > global level timeouts in assetion and action case


// use filter

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   // filter excatly work like for loop and find exact  text 
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})



