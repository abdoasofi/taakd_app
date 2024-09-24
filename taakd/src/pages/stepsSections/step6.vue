<script>
import Button from "../../components/button.vue";


import FieldContainer from "../../components/fieldContainer.vue";


import ReviewLabel from "./components/reviewLabel.vue";
import ReviewValue from "./components/reviewValue.vue";

export default {
  components:{
    ReviewLabel,
    ReviewValue,
    Button,
    FieldContainer
  }
};
</script>

<template>
  
  <div class="container py-6">
    <h3 class="text-lg font-medium mb-3 text-black">Personal information</h3>

<div>
    <Button level="edit" >edit this section</Button>
    <FieldContainer>
        <ReviewLabel :isMandatory="true">Birth Date</ReviewLabel>
        <ReviewValue>22-5-2022</ReviewValue>
    </FieldContainer>
</div>
</div>


</template>
