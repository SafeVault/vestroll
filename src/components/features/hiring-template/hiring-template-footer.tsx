import HiringTemplateButtonGroup, {type HiringTemplateButtonGroupProps} from "./hiring-template-button-group";

export default function HiringTemplateFooter({onDeleteTemplate, className}: HiringTemplateButtonGroupProps) {
    return <HiringTemplateButtonGroup onDeleteTemplate={onDeleteTemplate} className={className} />
}