{
    description = "JS - setup";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = {nixpkgs, flake-utils, ...}:
    let
        systems = builtins.attrNames nixpkgs.legacyPackages;
    in flake-utils.lib.eachSystem systems (
        system: let
            pkgs = import nixpkgs {inherit system;};
        in 
        # rec
        {
            devShells.default = pkgs.mkShell { 
                buildInputs = with pkgs; [
                    bun
                    nodejs
                    turso-cli
                ];

                # nativeBuildInputs = with pkgs; [];

            };
        }
    );
}
