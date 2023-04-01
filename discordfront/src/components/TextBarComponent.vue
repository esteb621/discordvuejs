<template>
    <div class="p-2 mb-2 input-group">
        <input id="textbar" type="text" class="form-control" placeholder="Ecrivez ici votre message..."
            aria-label="Recipient's username" aria-describedby="button-addon2">
        <button id="send" class="btn btn-outline-secondary p-2" type="button">
            <i class="bi bi-send-fill"></i></button>
    </div>
</template>

<style scoped>
#textbar{
    background-color: #40444b;
    box-shadow: none;
}

#textbar{
    
    color: #d7ddde;
    border: 0;
    padding: 10px 1rem;
    border-radius:8px 0 0 8px;
    
}

#textbar::placeholder{
    color: #727677;
}

#send{
    border:0;
    border-radius:0 8px 8px 0;
    background-color: #40444b;
}




</style>