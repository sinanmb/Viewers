{
  /* <TextInput
type="text"
autoFocus
value={this.state.label}
onChange={this.handleLabelChange}
label="Label"
/>

<select
id="category"
className="simpleDialogInput"
onChange={this.handleCategoryChange}
value={this.state.category}
>
{categoryOptionElements}
</select>

<select
id="type"
className="simpleDialogInput"
onChange={this.handleTypeChange}
value={this.state.type}
>
{typeOptionElements}
</select>


const categoryOptionElements = this.state.categoryOptions.map(option => (
  <option value={option} key={option}>
    {option}
  </option>
));

const typeOptionElements = category
  ? this.state.typeOptions[category].map(option => (
      <option value={option} key={option}>
        {option}
      </option>
    ))
  : null; */
}
