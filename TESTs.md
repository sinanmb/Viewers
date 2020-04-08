# Tests

In the patient browser, select a study from the working list dropdown

```
Should be redirected to the study view
Should see a dropdown with the studies that belong to the working list
Should see the X and ✓ options as well as current status
Should be able to go to previous and next study in the working list thanks to the left and right arrows
Should be able to select another study in the dropdown
```

In the patient browser, clicking on a study

```
Should be redicted to the study view
Should not see the working list dropdown nor the icons to navite through the studies
```

Default behavior study view

```
Landmark tool selected by default
Default layout is two viewports side by side
When Measurements Panel is expanded, should see Nerve / Stenosis selector
Nerve is selected by default
The series description is displayed in the bottom left corner of each viewport
```

Adding a Landmark on viewport

```
Should prompt user to fill in info in the modal window
Should display the measurement index next to the landmark position after click on confirm button
Clicking on cancel button removes the landmark from the viewport
```

Clicking on Save measurements

```
Should show a green confirmation message
Should save the current measurements in the database
```

Metadata Panel

```
Should be wider than measurement panel
Should display the study metadata info
Should have the first section expanded, and the others collapsed
```

Landmark dialog options

```
Label: Nerve or Stenosis

If label is Nerve
    Position Intratechal or Extrathecal
    Type: Displace and/or Compress

    If position is Extrathecal
        Location: Left or Right
        Also choose in the dropdown among:
            Central/Paracentral
            Lateral recess
            Neural foramen
            Extraforaminal

        Cause: Disc or Osteophyte or Stenosis

If label is Stenosis
    Severe central canal stenosis: yes or no
```

Landmark keyboard shortcuts

```
1 is a shortcut for Nerve
2 is a shortcut for Stenosis
```

Navigation shortcuts

```
` is a shortcut to toggle between viewports
up and down arrows navigate to the previous and next series respectively
```

Edit Landmark

```
There is no edit label for landmarks
When click on edit description, the Landmark annotation opens with all the current info
```

User can drag a thumbnail from the series panel on the left

```
That should display the series on in the viewport where it was dropped
```

Click on measurement

```
Should display the measurement in the first viewport, the one on the left
```
