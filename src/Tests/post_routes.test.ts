import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../Models/post_model'

//const { TestWatcher } = require("jest")

const sender = "this is my test message"
const message = "Auto Test Api"
let retId = ""

beforeAll(async () => {
    //clear Posts collection
    await Post.remove({"sender" : sender})
})


afterAll(async () => {
    await Post.remove({"sender" : sender})
    mongoose.connection.close()

})

describe("This is Post API test", () => {

    test("Test Post get API", async () => {
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    });

    test("Test Post post API", async () => {
        const response = await request(app).post('/post').send({
            "message" : message,
            "sender" : sender
        })

        expect(response.statusCode).toEqual(200)

        const retMessage = response.body.message
        const retSender = response.body.sender
        retId = response.body._id

        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retId).not.toEqual(null)
    });

    test("Test get Post by ID API", async () => {
        const response = await request(app).get('/post/' + retId)
        expect(response.statusCode).toEqual(200)

        const retMessage = response.body.message
        const retSender = response.body.sender
        const retId2 = response.body._id

        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retId2).toEqual(retId)
        
    })

    test("Test get Post by Sender API",async () => {
        const response = await request(app).get('/post?sender=' + sender)
        expect(response.statusCode).toEqual(200)

        const retMessage = response.body[0].message
        const retSender = response.body[0].sender
        const retId2 = response.body[0]._id

        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retId2).toEqual(retId)
    })

    test("Test delete Post by ID API", async () => {
        const response = await request(app).delete('/post/' + retId)
        expect(response.statusCode).toEqual(200)

        const response2 = await request(app).get('/post/' + retId)
        expect(response2.statusCode).toEqual(400)

    })

});