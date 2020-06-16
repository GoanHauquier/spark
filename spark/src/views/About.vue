<template>
  <div class="about-wrapper container-fluid">
    <div class="container about-content">
        <h1>About SPARK</h1>
        <p>Spark is a project to <u >connect</u> and <u>inspire</u> all musicians, singers and producers alike.</p>
        <p>Gone are the days of looking for people to collaborate with based on their status.</p>
        <p>With Spark we aim to connect people entirely based on their music.</p>
        
        <h2>How it works</h2>

        <div v-animate="'slide-right'" class="row tutorial-block fade-in">
          <div class="col-sm-6">
              <h3><u>1. Upload your audio</u></h3>
              <p>Upload a small snippet of your music you're most proud of.</p>
              <p>You can only upload 1MB! Get creative.</p>
              <router-link to="/edit"><u>Upload here</u></router-link>
            </div>
            <div class="col-sm-6">
              
            </div>
        </div>

        <div v-animate="'slide-left'"  class="row  tutorial-block">
            <div class="col-sm-6">
              
            </div>
            <div class="col-sm-6">
              <h3><u>2. Enter the Queue</u></h3>
              <p>When you upload your audio, you will unlock 'the Queue'.</p>
              <p>When you enter the Queue you will cycle through other users' audio snippets.</p>
            </div>
        </div>

        <div v-animate="'slide-right'" class="row tutorial-block"> 
          <div class="col-sm-6">
            <h3><u>3. Listen and connect</u></h3>
            <p>When you hear something you like you can press the 'Heart' button.</p>
            <p>If the other user also presses the 'Heart' button on your profile you will become Sparks!</p>
          </div>
          <div class="col-sm-6">
            
          </div>
        </div>

        <div v-animate="'slide-up'" class="text-center faq-box">
          <h3 id="FAQAnchor"><u>FAQ</u></h3>
          <div class="faq">
            <VueFaqAccordion 
              :items="myItems"
              activeColor="#eb9788"
            />
        </div>
        </div>
    </div>
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  
  </div>
</template>

<script>
import VueFaqAccordion from 'vue-faq-accordion'

export default {
  components: {
    VueFaqAccordion
  },
  data () {
    return {
      myItems: [
          {
            title: 'What is Spark?',
            value: "Spark is an anonymous networking platform for musicians, producers, singers, dj's, etc.",
          },
          {
            title: 'Why can I only upload 1MB files?',
            value: 'At Spark we know the value of a good first impression. In just 1MB you are limited to choosing a short piece of music you are most passionate about.',
          },
          {
            title: 'Can people see when I skip someone?',
            value: 'No. The matching process is completely anonymous.',
          },
          {
            title: 'What are Sparks?',
            value: "Your Sparks are the people who you've given a 'Heart' and returned one too. You can view their profile by clicking their name in the 'Your Sparks' window.",
          },
          {
            title: 'What music can I upload?',
            value: "It's very important that you only upload your <b>OWN</b> music. If you upload others' music this can serverly damage your reputation and credibility as an artist!<br> Please do <b>not</b> upload any unauthorized or illegal samples*",
          },
        ]
    }
  }
}
</script>
