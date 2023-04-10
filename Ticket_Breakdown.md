# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions
- A relational database is being used.
- Agent to Facility relationship is 1:M, means an agent can work on many facilities in a single quarter.
- Updated UI designs (Figma) have been shared already with the frontend team.
- A front-end validation is sufficient for the new field at the time it's being entered by the end user.

### Ticket 1: [Backend] Update DB migration scripts to include `customAgentId`

Implementation Details: 
- Update the db migration scripts including a new db table `FacilityAgent` with the schema: 
(id, facilityId, AgentId, AgentCustomId)
- Migrate existing data to the new table.

AC: should be able to create/read/update/delete Agent informations queried against `facilityId` and `customAgentId`

Estimation: 1 Story Point

### Ticket 2: [Backend] Update add agent and update agent API endpoints to include `customAgentId`

Implementation Details: 
- Generate new ORM modals including aforementioned property.
- Update API methods including the new field. Also add validations.
- Update unit tests. 
- Update API specification (shared with frontend or any other team)
- Update mock APIs.

AC: The frontend team should be able to call those API methods to include an `customAgentId`.

Estimation: 3 Story Point

### Ticket 3: [Frontend] Update add agent and edit agent pages to include `customAgentId`

Implementation Details: 
- Update the form including a new property called Custom Agent Id (Check updated desings for more clarity)
- Make sure the field is validated before the form submision.
- Update unit tests, functional tests and visual regression tests.

AC: 
- As the Facility Manager, I should be able to add a custom id to an agent at the time the agent is being added to the facility.
- As the Facility Manager, I should be able to update the custom id of an agent already has been added to the facility.
- As the Facility Manager, I should be shown a validation error massage if the custom Id I'm typing is invalid or not unique.

Estimation: 3 Story Point

### Ticket 4: [Frontend] Update facility shift reports including `customAgentId`

Implementation Details: 
- Update `getShiftsByFacility` and `generateReport` including `customAgentId`

AC: 
- As the Facility Manager, I should be able to see the custom agent id in the generated reports.

Estimation: 1 Story Point