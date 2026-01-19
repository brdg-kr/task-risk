# Job Zone Reference

* [Excel](/dictionary/30.1/excel/job_zone_reference.html)
* [Text](/dictionary/30.1/text/job_zone_reference.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/job_zone_reference.html)
* [Oracle](/dictionary/30.1/oracle/job_zone_reference.html)

| **Purpose:** | Provide Job Zone data (developed to help transition DOT’s measures of Specific Vocational Preparation (SVP) to O*NET’s measure of experience, education, and job training). |
| **Table Name:** | job_zone_reference |
| **Download:** | [02_job_zone_reference.sql](/dl_files/database/db_30_1_mysql/02_job_zone_reference.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| job_zone | Decimal(1,0) | Job Zone number |
| name | Character Varying(50) | Job Zone name/zone |
| experience | Character Varying(300) | Job Zone experience requirements |
| education | Character Varying(500) | Job Zone educational requirements |
| job_training | Character Varying(300) | Job Zone training requirements |
| examples | Character Varying(500) | Job Zone examples |
| svp_range | Character Varying(25) | Specific vocational preparation range |

This file describes the five O*NET Job Zones, which are groups of occupations that need the same level of experience, education, and training. The file is displayed in seven tab delimited fields with the columns named Job Zone, Name, Experience, Education, Job Training, Examples, and SVP Range. The seven fields are represented by one row. There are a total of 5 rows of data in this file.

For more information, see:
* [Procedures for O*NET Job Zone Assignment](https://www.onetcenter.org/reports/JobZoneProcedure.html)
* [Procedures for O*NET Job Zone Assignment: Updated to Include Procedures for Developing Preliminary Job Zones for New O*NET-SOC Occupations](https://www.onetcenter.org/reports/JobZoneProcedureUpdate.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 - 30.1 | No structure changes |

### Data Example - job_zone_reference:

| job_zone | name | experience | education | job_training | examples | svp_range |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Job Zone One: Little or No Preparation Needed | Little or no previous work-related skill, knowledge, or experience is needed for these occupations. For example, a person can become a waiter or waitress even if he/she has never worked before. | Some of these occupations may require a high school diploma or GED certificate. | Employees in these occupations need anywhere from a few days to a few months of training. Usually, an experienced worker could show you how to do the job. | These occupations involve following instructions and helping others. Examples include agricultural equipment operators, dishwashers, floor sanders and finishers, landscaping and groundskeeping workers, logging equipment operators, baristas, and maids and housekeeping cleaners. | (Below 4.0) |
| 2 | Job Zone Two: Some Preparation Needed | Some previous work-related skill, knowledge, or experience is usually needed. For example, a teller would benefit from experience working directly with the public. | These occupations usually require a high school diploma. | Employees in these occupations need anywhere from a few months to one year of working with experienced employees. A recognized apprenticeship program may be associated with these occupations. | These occupations often involve using your knowledge and skills to help others. Examples include orderlies, counter and rental clerks, customer service representatives, security guards, upholsterers, tellers, and dental laboratory technicians. | (4.0 to < 6.0) |
| 3 | Job Zone Three: Medium Preparation Needed | Previous work-related skill, knowledge, or experience is required for these occupations. For example, an electrician must have completed three or four years of apprenticeship or several years of vocational training, and often must have passed a licensing exam, in order to perform the job. | Most occupations in this zone require training in vocational schools, related on-the-job experience, or an associate's degree. | Employees in these occupations usually need one or two years of training involving both on-the-job experience and informal training with experienced workers. A recognized apprenticeship program may be associated with these occupations. | These occupations usually involve using communication and organizational skills to coordinate, supervise, manage, or train others to accomplish goals. Examples include hydroelectric production managers, desktop publishers, electricians, agricultural technicians, barbers, court reporters and simultaneous captioners, and medical assistants. | (6.0 to < 7.0) |