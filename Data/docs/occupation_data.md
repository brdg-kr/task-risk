# Occupation Data

* [Excel](/dictionary/30.1/excel/occupation_data.html)
* [Text](/dictionary/30.1/text/occupation_data.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/occupation_data.html)
* [Oracle](/dictionary/30.1/oracle/occupation_data.html)

| **Purpose:** | Provide O*NET-SOC codes, titles, and descriptions. |
| **Table Name:** | occupation_data |
| **Download:** | [03_occupation_data.sql](/dl_files/database/db_30_1_mysql/03_occupation_data.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code |
| title | Character Varying(150) | O*NET-SOC Title |
| description | Character Varying(1000) | O*NET-SOC Description |

This file contains each O*NET-SOC code, occupational title, and definition/description. The file is displayed in three tab delimited fields with the columns named O*NET-SOC Code, Title, and Description. The three fields are represented by one row. There are a total of 1,016 rows of data in this file.

For more information, see:
* [Updating the O*NET-SOC Taxonomy: Incorporating the 2010 SOC Structure](https://www.onetcenter.org/reports/Taxonomy2010.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 - 30.1 | No structure changes |

### Data Example - occupation_data:

| onetsoc_code | title | description |
| --- | --- | --- |
| 11-9041.01 | Biofuels/Biodiesel Technology and Product Development Managers | Define, plan, or execute biofuels/biodiesel research programs that evaluate alternative feedstock and process technologies with near-term commercial potential. |
| 17-2072.00 | Electronics Engineers, Except Computer | Research, design, develop, or test electronic components and systems for commercial, industrial, military, or scientific use employing knowledge of electronic theory and materials properties. Design electronic circuits and components for use in fields such as telecommunications, aerospace guidance and propulsion control, acoustics, or instruments and controls. |
| 19-4031.00 | Chemical Technicians | Conduct chemical and physical laboratory tests to assist scientists in making qualitative and quantitative analyses of solids, liquids, and gaseous materials for research and development of new products or processes, quality control, maintenance of environmental standards, and other work involving experimental, theoretical, or practical application of chemistry and related sciences. |
| 45-4011.00 | Forest and Conservation Workers | Under supervision, perform manual labor necessary to develop, maintain, or protect areas such as forests, forested areas, woodlands, wetlands, and rangelands through such activities as raising and transporting seedlings; combating insects, pests, and diseases harmful to plant life; and building structures to control water, erosion, and leaching of soil. Includes forester aides, seedling pullers, tree planters, and gatherers of nontimber forestry products such as pine straw. |
| 51-8012.00 | Power Distributors and Dispatchers | Coordinate, regulate, or distribute electricity or steam. |