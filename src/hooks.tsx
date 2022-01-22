import { useState, ReactNode } from "react"
import { AutocompleteRenderInputParams } from "@material-ui/lab"
import { TextField } from "@material-ui/core"
import { Chip } from "@material-ui/core"

interface inputProps {
  user: string,
  userCopy: string
}

const emptyString = ""

export function useSearch() {
  const [hasTag, setHasTag] = useState<boolean>(false)
  const [value, setValue] = useState<string[]>([])
  const [prevChipValue, setPrevChipValue] = useState<string[]>([])
  const [activeChipValue, setActiveChipValue] = useState<string>(emptyString)
  const [input, setInput] = useState<inputProps>({ user: emptyString, userCopy: emptyString })

  const onChange = (_: any, values: string[], reason: string): void => {
    if (reason !== "select-option") return
    if (activeChipValue) {
      setPrevChipValue(state => ([...state, activeChipValue]))
      setActiveChipValue(emptyString)
    }
    setHasTag(false)
    setValue(values)
  }

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    newInputValue: string,
    reason: string
  ): void => {
    if (!["change", "keydown"].includes(event.type)) return
    switch (reason) {
      case "input":
        setHasTag(false)
        setInput({ user: newInputValue, userCopy: newInputValue })
        break
      case "reset":
        setInput(state => ({ ...state, user: emptyString }))
        setHasTag(true)
        setActiveChipValue(`${value[value.length - 1]}:${input.userCopy}`)
        break
    }
  }

  const renderTags = (values: string[]): ReactNode => {
    if (hasTag) {
      return [...prevChipValue, activeChipValue].map((o, i) =>
        <Chip
          onDelete={() => { }}
          label={o}
          key={i}
          size="small"
        />
      )
    }
    return (
      <>
        {prevChipValue.map((o, i) =>
          <Chip
            onDelete={() => { }}
            size="small"
            key={i}
            label={o}
          />
        )}
        <div>
          {`${values[values.length - 1]}:`}
        </div>
      </>
    )
  }

  const renderInput = (params: AutocompleteRenderInputParams): ReactNode => {
    return <TextField
      {...params}
      label="Search"
      variant="outlined"
    />
  }

  return {
    value,
    input,
    onChange,
    onInputChange,
    renderTags,
    renderInput
  }
}
