import { Autocomplete } from "@material-ui/lab"
import { Box } from "@material-ui/core"
import { useSearch } from "./hooks"

const options = ["Option1", "Option2", "Option3", "Option4"]

function Demo() {
  const {
    input,
    value,
    onChange,
    onInputChange,
    renderTags,
    renderInput
  } = useSearch()

  return (
    <Box m={4}>
      <Autocomplete
        id="controllable-states-demo"
        disableClearable
        freeSolo
        multiple
        style={{ width: 340 }}
        options={options}
        value={value}
        inputValue={input.user}
        filterOptions={(options: string[]) => options.filter(o => !value.includes(o))}
        onChange={onChange}
        onInputChange={onInputChange}
        renderTags={renderTags}
        renderInput={renderInput}
      />
    </Box>
  )
}

export default Demo
