import { test, expect, request } from "@playwright/test"

// we can handle api req and response through playwright also
// there are many case in UI testing where can use api to make our test cases less flaky

// case 1:  do no login again again  for every test case, just login once  though api call
// and save authentication token getting in response. And that api token we have to store in 
// local storage using js method (as playwright not provide method to handle with local storage)

// case 2: create api call to create/checkout product

let token;
const logindata = {userEmail:"mahajansaurabh953@gmail.com",
                 userPassword: "Saurabh@123"};
let orderedProduct = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};                 

test.beforeAll( async ()=>{
    const apicontext = await request.newContext();
    const apiresponse= await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
        data: logindata
    });

    await expect(apiresponse.ok()).toBeTruthy();
    const responseBody = await apiresponse.json();
    token = responseBody.token;
})


test("get all phones names", async({page})=>{
    const product = "ZARA COAT 3";
    const allProduct = page.locator("div.card-body");

    // due to this code we are saving generated api token in local storage of browser though this we dont need to login again again
    page.addInitScript(value=>{
        window.localStorage.setItem("token",value);
    },token)
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").last().waitFor();
     const ct = await allProduct.count();

        for( let i=0 ; i < ct; ++i){
            await console.log(i + ":" + await allProduct.nth(i).locator("b").textContent())
            if(await allProduct.nth(i).locator("b").textContent() === product){
            await allProduct.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
            break;
            }
        }
    await page.locator('i.fa-shopping-cart').first().click();  
    await page.locator('div li').first().waitFor();
    const boolean = await  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(boolean).toBeTruthy();
    
})







