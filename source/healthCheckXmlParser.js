"use strict";

const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser({
  "ignoreAttributes": false,
  "attributeNamePrefix": "__",
});

exports.pickupOutsideReferenceRangeEntries = async xml => {
  const entries = parser.parse(xml)
  .ClinicalDocument
  .component
  .structuredBody
  .component
  .find(component => component.section.code.__code === "01010")
  .section
  .entry;

  return entries.filter(entry => entry?.observation?.interpretationCode?.__code === "H");
};
