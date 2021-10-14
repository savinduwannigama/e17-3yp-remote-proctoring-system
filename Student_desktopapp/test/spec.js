const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')


// describe('Registering', function() {
//     this.timeout(30000)
//     let app;

//     before(function() {
//         app = new Application({
//             path: electronPath,
//             args: [path.join(__dirname, '..')]
//         })
//         return app.start()
//     })

//     after(function() {
//         if (app && app.isRunning()) {
//             return app.stop()
//         }
//     })

//     it('Register', async() => {
//         const count = await app.client.getWindowCount();
//         assert.equal(count, 1);

//         const loginemail = await app.client.$('#log-email');
//         assert.ok(loginemail);

//         await sleep(1000);
//         element = await app.client.$(".switch")
//         await element.click();
//         await sleep(1000);
//         await element.click();
//         await sleep(1000);
//         await element.click();
//         await sleep(1000);
//         const regemail = await app.client.$('#reg-email');
//         assert.ok(regemail);
//         const input = await app.client.$('#reg-email');
//         await input.setValue('hello@gmail.com');
//         await sleep(1000);
//         const input2 = await app.client.$('#reg-password');
//         await input2.setValue('hello12345');
//         await sleep(1000);
//         const input3 = await app.client.$('#confirm-password');
//         await input3.setValue('hello12345');
//         await sleep(1000);
//         element = await app.client.$("button[name='Sign up']")
//         await element.click();
//         const title = await app.client.$(".title");
//         const h1Text = await title.getText();
//         assert.equal(h1Text, "Authenticate your account")
//         await sleep(1000);

//     })

//     it('Authenticate', async() => {
//         var input = await app.client.$('#first');
//         await input.setValue('1');
//         await sleep(100);
//         input = await app.client.$('#second');
//         await input.setValue('2');
//         await sleep(100);
//         input = await app.client.$('#third');
//         await input.setValue('3');
//         await sleep(100);
//         input = await app.client.$('#fourth');
//         await input.setValue('4');
//         await sleep(100);
//         input = await app.client.$('#fifth');
//         await input.setValue('5');
//         await sleep(100);
//         input = await app.client.$('#sixth');
//         await input.setValue('6 ');
//         await sleep(100);
//         const title = await app.client.$("h1");
//         const h1Text = await title.getText();
//         assert.equal(h1Text, "Login")
//         await sleep(1000);
//     })

//     it('Login', async() => {
//         const input = await app.client.$('#log-email');
//         await input.setValue('hello@gmail.com');
//         await sleep(1000);
//         const input2 = await app.client.$('#log-password');
//         await input2.setValue('hello');
//         await sleep(1000);
//         const input3 = await app.client.$('#staylogged');
//         await input3.click();
//         await sleep(1000);
//         element = await app.client.$("button[name='Log in']")
//         await element.click();
//         var title = await app.client.$("h1");
//         var h1Text = await title.getText();
//         assert.equal(h1Text, "Login")
//         await sleep(1000);
//         await input2.setValue('hello12345');
//         await sleep(1000);
//         await element.click();
//         title = await app.client.$("#title");
//         h1Text = await title.getText();
//         assert.equal(h1Text, "Home")
//         await sleep(1000);

//     })

// })
describe('Application launch', function() {
    this.timeout(30000)
    let app;

    before(function() {
        app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')]
        })
        return app.start()
    })

    after(function() {
        if (app && app.isRunning()) {
            return app.stop()
        }
    })


    it('Navigate', async() => {
        const input = await app.client.$('#log-email');
        await input.setValue('hello@gmail.com');
        await sleep(1000);
        //email = await input.getText();
        //assert.equal(email, "hello@gmail.com");
        const input2 = await app.client.$('#log-password');
        await input2.setValue('hello12345');
        await sleep(1000);
        element = await app.client.$("button[name='Log in']")
        await element.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Home")
        await sleep(3000);

    })

    it('Settings', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#settings");
        await page.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Settings")
        await sleep(1000);
        var element = await app.client.$('#changename');
        if (!element) {
            await sleep(3000);
        }
        element = await app.client.$('#changename');
        await element.click();
        await sleep(1000);
        element = await app.client.$('#name');
        await element.setValue('Sashini Liyanage');
        await sleep(2000);
        element = await app.client.$('button[name="savename"');
        await element.click();
        await sleep(1000);
    })

    it('Course page', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#course");
        await page.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Courses")
        await sleep(3000);
        await app.client.waitUntilWindowLoaded();
        input = await app.client.$('#myInput');
        await input.setValue('A');
        await sleep(1000);
        await input.setValue('Al');
        await sleep(1000);
        await input.setValue('Algo');
        await sleep(1000);
        var element = await app.client.$('li[id="2"]');
        if (!element) {
            await sleep(2000);
        }
        element = await app.client.$('li[id="2"]');
        await element.click();
        await sleep(2000);
        element = await app.client.$('button[name="close"');
        await element.click();
        await sleep(1000);

    })

    it('Dashboard', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#dashboard");
        await page.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Dashboard")
        await sleep(1000);
    })

    it('Exam schedule', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#schedule");
        await page.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Schedule");
        await sleep(1000);
        element = await app.client.$(".fc-next-button");
        await element.click();
        await sleep(3000);
        var element = await app.client.$('.fc-sticky');
        // elementtxt = await element.getHTML();
        //console.log(elementtxt);
        if (!element) {
            await sleep(3000);
        }
        element = await app.client.$('.fc-sticky');
        await element.click();
        await sleep(2000);
        element = await app.client.$('button[name="close"');
        await element.click();
        await sleep(1000);

    })

    // it('Notification', async() => {
    //     trigger = await app.client.$(".smartphone-menu-trigger");
    //     await trigger.click();
    //     await sleep(1000);
    //     page = await app.client.$("#notification");
    //     await page.click();
    //     title = await app.client.$("#title");
    //     h1Text = await title.getText();
    //     assert.equal(h1Text, "Notifications")
    //     await sleep(1000);
    // })

    it('Meeting room', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#help");
        await page.click();
        await sleep(1000);
        element = await app.client.$('#start');
        await element.click();
        await sleep(15000);
        element = await app.client.$('#download');
        await element.click();
        await sleep(8000);
    })

    it('Upload page', async() => {
        trigger = await app.client.$(".smartphone-menu-trigger");
        await trigger.click();
        await sleep(1000);
        page = await app.client.$("#upload");
        await page.click();
        title = await app.client.$("#title");
        h1Text = await title.getText();
        assert.equal(h1Text, "Upload")
        await sleep(3000);
        var element = await app.client.$('p[id="0"]');
        if (!element) {
            await sleep(2000);
        }
        element = await app.client.$('p[id="0"]');
        await element.click();
        await sleep(2000);
        element = await app.client.$('button[name="upload"]')
        await element.click();
        await sleep(5000);
        element = await app.client.$('button[name="close"');
        await element.click();
        await sleep(1000);
    })
})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// <li tabindex="0" id="settings" class="icon-settings"><span>Settings</span></li>
// <li tabindex="0" id="help" class="icon-