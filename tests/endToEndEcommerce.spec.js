import { test, expect } from "@playwright/test"
import { waitForDebugger } from "node:inspector";


test("TC_Verify successfull login", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("mahajansaurabh953@gmail.com");
    await page.locator("#userPassword").fill("Saurabh@123");
    await page.locator("#login").click();
    await expect(page.locator(".fa-home")).toBeVisible();

})

test("TC_Verify product is present on home page and add to cart" , async({page})=>{
            const product = "ZARA COAT 3";
            const allProduct = page.locator("div.card-body");
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill("mahajansaurabh953@gmail.com");
            await page.locator("#userPassword").fill("Saurabh@123");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');
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

        // using dirrect arrertion
    // await expect(page.locator('div.cartSection h3')).toContainText(product);

    // other way of assertion  has-text

    // Note : some methods having by default i.e click() . isVisible dont have default wait
    // so we have explicity add the wait  so we will wait for desired element .

    await page.locator('div li').first().waitFor();
    const boolean = await  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(boolean).toBeTruthy();
    await page.pause();

    
})


test("TC_verify checkout funtionality", async({page})=>{
    const country = ' India';
    const product = "ZARA COAT 3";
    const suggestions = page.locator('section.ta-results button');
    const allProduct = page.locator("div.card-body");
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill("mahajansaurabh953@gmail.com");
            await page.locator("#userPassword").fill("Saurabh@123");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');
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
    await page.getByRole('button',{name : 'Checkout'}).click();
    await page.locator('input.text-validated').first().fill("123456789012");
    const ddldrop1 = await page.locator('select.ddl').first();
    await ddldrop1.selectOption('07');
    const ddldrop2 =  await page.locator('select.ddl').last();
    await ddldrop2.selectOption('23');
    await page.getByRole('textbox').nth(1).fill('123');
    await page.getByRole('textbox').nth(2).fill('Saurabh Mahajan');
    //fill :- like copy pase whole word is filled
    // pressSequentially :- use to type letter one by one 
    // presssequentially very helpfull in  dynamic dropdown
    await page.locator("[placeholder='Select Country']").pressSequentially('Ind');

// await page.locator("[placeholder*='Country']").pressSequentially("ind");
// This step may occasionally fail if the application server is slow due to heavy traffic. 
// In such cases, you can introduce a delay and rewrite the step as:

// await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

    await page.locator('section.ta-results').waitFor();   
    
    const count = await suggestions.count();
    for(let i =0 ; i < count ; i++){
        if(await suggestions.nth(i).locator('span').textContent() === country){
            await console.log("in if condtion")
            await suggestions.nth(i).click();
            break;
        }
    } 
    await page.locator('a.action__submit').click();
    await expect(page.locator('text=Thankyou for the order')).toBeVisible();


})


test("TC_verify my order section", async({page})=>{
    const country = ' India';
    const product = "ZARA COAT 3";
    const suggestions = page.locator('section.ta-results button');
    const myorderlist = page.locator('tr.ng-star-inserted');
    const allProduct = page.locator("div.card-body");
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill("mahajansaurabh953@gmail.com");
            await page.locator("#userPassword").fill("Saurabh@123");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');
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
    await page.getByRole('button',{name : 'Checkout'}).click();
    await page.locator('input.text-validated').first().fill("123456789012");
    const ddldrop1 = await page.locator('select.ddl').first();
    await ddldrop1.selectOption('07');
    const ddldrop2 =  await page.locator('select.ddl').last();
    await ddldrop2.selectOption('23');
    await page.getByRole('textbox').nth(1).fill('123');
    await page.getByRole('textbox').nth(2).fill('Saurabh Mahajan');
    await page.locator("[placeholder='Select Country']").pressSequentially('Ind');

    await page.locator('section.ta-results').waitFor();   
    
    const count = await suggestions.count();
    for(let i =0 ; i < count ; i++){
        if(await suggestions.nth(i).locator('span').textContent() === country){
            await suggestions.nth(i).click();
            break;
        }
    } 
    await page.locator('a.action__submit').click();
    const orderid = (await page.locator('tr.ng-star-inserted td').first().textContent()).replaceAll("|","").trim();
    await console.log("my order id: " + orderid);
    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await myorderlist.first().waitFor();
    const myoderlistcount = await myorderlist.count();
    await console.log(myoderlistcount);

    for (let index = 0; index < myoderlistcount; index++) {
    
        if(await myorderlist.nth(index).locator('th').textContent() === orderid.replaceAll("|","").trim()){
            await console.log("in if condtion")
            await myorderlist.nth(index).locator('td').nth(4).locator('button').click();
            break;
        }
        
    }
    await page.locator('p.tagline').waitFor();
    console.log(await page.locator('div.email-title').textContent());
    await expect(page.locator('div.email-title')).toContainText(" order summary ");


})