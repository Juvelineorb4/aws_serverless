const message = {
    action: "update",
    data: {
        id: 1,
        name: "Luis"
    }
}
console.log(JSON.stringify(JSON.stringify(message)))