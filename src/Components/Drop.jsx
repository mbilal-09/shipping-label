
'use client';

import { Dropdown } from 'flowbite-react';

function Component() {
  return (
    <Dropdown label="Dropdown button">
      <Dropdown.Item>UPS 2ND DAY AIR</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>UPS NEXT DAY AIR</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>UPS Ground</Dropdown.Item>
    </Dropdown>
  );
}
