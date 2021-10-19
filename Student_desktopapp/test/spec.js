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
    this.timeout(100000)
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


    it('Log in', async() => {
        const input = await app.client.$('#log-email');
        await input.setValue('e17190@eng.pdn.ac.lk');
        await sleep(1000);
        const input2 = await app.client.$('#log-password');
        await input2.setValue('sashini1234');
        await sleep(1000);
        element = await app.client.$("button[name='Log in']")
        await element.click();
        var element = title = await app.client.$("#title");
        if (!element) {
            await sleep(5000);
        }
        element = title = await app.client.$("#title");
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
        await element.setValue('LIYANAGE S N');
        await sleep(2000);
        element = await app.client.$('button[name="savename"');
        await element.click();
        await sleep(1000);
        var element = await app.client.$('#changeavatar');
        if (!element) {
            await sleep(3000);
        }
        element = await app.client.$('#changeavatar');
        await element.click();
        await sleep(1000);
        element = await app.client.$('#temp');
        await element.click();
        await sleep(2000);
        element = await app.client.$('#changeavtr');
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
        await sleep(3000);
        await input.setValue('CO');
        await sleep(1000);
        await input.setValue('COM');
        await sleep(1000);
        await input.setValue('COMPUTER');
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
        await sleep(2000);
        element = await app.client.$(".fc-next-button");
        await element.click();
        await sleep(1000);
        await element.click();
        await sleep(1000);
        var element = await app.client.$('.fc-daygrid-dot-event');
        // elementtxt = await element.getHTML();
        //console.log(elementtxt);
        // if (!element) {
        //     await sleep(3000);
        // }
        // element = await app.client.$('.fc-sticky');
        await element.click();
        var element = await app.client.$('button[name="joinexam"');
        if (!element) {
            await sleep(2000);
        }
        element = await app.client.$('button[name="joinexam"');
        input = await app.client.$('#display-name');
        //await sleep(1000);
        await input.setValue('E/17/190 LIYANAGE S N');
        await element.click();
        await sleep(1000);

    })

    it('Meeting room', async() => {
        // trigger = await app.client.$(".smartphone-menu-trigger");
        // await trigger.click();
        //await sleep(1000);
        //page = await app.client.$("#help");
        //await page.click();
        //await sleep(1000);
        //element = await app.client.$('#start');
        //await element.click();
        element = await app.client.$('button[name="download"]');
        await sleep(15000);
        await element.click();
        await sleep(10000);
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