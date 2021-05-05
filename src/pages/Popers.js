import React from "react";
import { Popover } from "react-bootstrap";
function Popers({ togglePopover, popoverOpen }) {
  return (
    <div>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="mypopover"
        toggle={togglePopover}
      >
        <Popover.Content>
          <strong>Holy guacamole!</strong> Check this info.
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default Popers;
