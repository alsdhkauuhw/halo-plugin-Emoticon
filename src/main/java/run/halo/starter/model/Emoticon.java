package run.halo.starter.model;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import run.halo.app.extension.AbstractExtension;
import run.halo.app.extension.GVK;

@Data
@EqualsAndHashCode(callSuper = true)
@GVK(kind = "Emoticon", group = "Emoticon.plugin.halo.run",
    version = "v1alpha1", singular = "emoticon", plural = "emoticons")
public class Emoticon extends AbstractExtension {

    @Schema(requiredMode = REQUIRED)
    private TodoSpec spec;

    @Data
    public static class TodoSpec {

        @Schema(requiredMode = REQUIRED, minLength = 1)
        private String key;

        @Schema(requiredMode = REQUIRED)
        private String value;

        @Schema(requiredMode = REQUIRED)
        private String master;
    }
}