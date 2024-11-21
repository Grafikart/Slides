import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {Modal} from "./Modal.tsx";
import {userEvent} from "@testing-library/user-event";

describe('<Modal/>', () => {

  it('should render correctly', async () => {
    const spy =vi.fn()
    const user = userEvent.setup()
     render(<Modal title={"Demo"} onClose={spy}/>)
    await user.click(screen.getByRole('button', {name: 'Fermer'}))
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should close on escape', async () => {
    const spy =vi.fn()
    const user = userEvent.setup()
    render(<Modal title={"Demo"} onClose={spy}/>)
    await user.keyboard('[Escape]')
    expect(spy).toHaveBeenCalledOnce()
  })
})
