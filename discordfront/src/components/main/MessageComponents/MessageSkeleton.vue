<template>
    <div id="message" class="flex flex-row mb-3 animate-pulse">
        <div class="flex-shrink-0 p-2">
            <div class="rounded-full"></div>
        </div>
        <div class="p-2 flex flex-col flex-wrap text-left">
            <div></div>
            <div class="w-52"></div>
        </div>
    </div>
</template>
<script setup>


</script>
<style scoped>
#message img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
h4{
    color: #f1c40f;
    font-size: large;
    
}
p{
    color:#cccccc;
}


h4:focus{
    text-decoration: underline;
}

h4,p{
    width: fit-content;
}

#message h4:hover{
    text-decoration: underline;
    cursor: pointer;
}

#message:hover{
    background-color: #32353b;
}
</style>