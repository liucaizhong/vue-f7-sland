<template lang="html">
<div class="task-timeline">
  <f7-block>
    <f7-timeline>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item day="22" month="DEC" inner content="Another text goes here"></f7-timeline-item>
    </f7-timeline>

    <f7-timeline sides>
      <f7-timeline-item day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
    </f7-timeline>

    <f7-timeline sides>
      <f7-timeline-item side="right" day="21" month="DEC" inner content="Some text goes here"></f7-timeline-item>
      <f7-timeline-item side="left" day="23" month="DEC" inner content="Just plain text"></f7-timeline-item>
    </f7-timeline>

    <f7-timeline>
      <!-- With Item Elements -->
      <f7-timeline-item
        day="21"
        month="DEC"
        inner
        time="12:56"
        title="Item Title"
        subtitle="Item Subtitle"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat ipsam hic porro enim, accusamus perferendis, quas commodi alias quaerat eius nemo deleniti. Odio quasi quos quis iure, aperiam pariatur?"
      ></f7-timeline-item>

      <!-- With List -->
      <f7-timeline-item
        day="23"
        month="DEC"
      >
        <f7-list inset>
          <f7-list-item link="#" title="Item 1"></f7-list-item>
        </f7-list>
      </f7-timeline-item>

      <!-- With Card -->
      <f7-timeline-item
        day="24"
        month="DEC"
      >
        <f7-card title="Card Header" content="Card Content" footer="Card Footer"></f7-card>
      </f7-timeline-item>
    </f7-timeline>

  </f7-block>
</div>
</template>

<script>
export default {
}
</script>
