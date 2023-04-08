<template>
<div class="relative p-2 mb-2">
    <input id="textbar" type="text"
        class="shadow-none rounded-md  w-full p-3 pr-10 focus:outline-none
        bg-gray-800 text-gray-400 placeholder:text-gray-400"
        placeholder="Ecrivez votre message..."
        aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="absolute mt-3 right-0 mr-5 text-rounded-md text-gray-400 hover:text-gray-500 duration-200" type="button">
        <font-awesome-icon :icon="['fas', 'paper-plane'] " />
    </button>
</div>

</template>

<!-- <style scoped>
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
} -->




<!-- </style> -->